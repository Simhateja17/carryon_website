'use client';

import { importLibrary, setOptions } from '@googlemaps/js-api-loader';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { MapCoordinate } from '@/types';

type MarkerTone = 'driver' | 'pickup' | 'dropoff' | 'incident' | 'optimized';
type CircleTone = 'coverage';

export interface MapSurfaceMarker {
  id: string;
  position: MapCoordinate | null;
  label?: string;
  tone?: MarkerTone;
}

export interface MapSurfaceRoute {
  id: string;
  path: MapCoordinate[];
  tone?: 'planned' | 'actual' | 'optimized';
}

export interface MapSurfaceCircle {
  id: string;
  center: MapCoordinate | null;
  radiusMeters: number;
  label: string;
  detail?: string;
  tone?: CircleTone;
}

interface MapSurfaceProps {
  markers?: MapSurfaceMarker[];
  routes?: MapSurfaceRoute[];
  circles?: MapSurfaceCircle[];
  highlightedCircleId?: string | null;
  center?: MapCoordinate | null;
  zoom?: number;
  fallback?: React.ReactNode;
  height?: string | number;
  minHeight?: string | number;
  theme?: 'light' | 'dark';
  dark?: boolean;
}

const DEFAULT_CENTER = { lat: 3.139, lng: 101.6869 };
const markerColors: Record<MarkerTone, string> = {
  driver: '#2563EB',
  pickup: '#16A34A',
  dropoff: '#A855F7',
  incident: '#DC2626',
  optimized: '#0F172A',
};
const routeStyles = {
  planned: { strokeColor: '#2563EB', strokeOpacity: 0.78, strokeWeight: 4, strokeDasharray: true },
  actual: { strokeColor: '#EF4444', strokeOpacity: 0.9, strokeWeight: 4, strokeDasharray: false },
  optimized: { strokeColor: '#16A34A', strokeOpacity: 0.9, strokeWeight: 4, strokeDasharray: false },
};
const circleStyles: Record<CircleTone, { strokeColor: string; fillColor: string }> = {
  coverage: { strokeColor: '#2563EB', fillColor: '#3B82F6' },
};

let loaderPromise: Promise<typeof google> | null = null;
let optionsSet = false;

function getMapsApi() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) return Promise.reject(new Error('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not configured'));
  if (!loaderPromise) {
    if (!optionsSet) {
      setOptions({ key: apiKey, v: 'weekly' });
      optionsSet = true;
    }
    loaderPromise = importLibrary('maps').then(() => google);
  }
  return loaderPromise;
}

function validPosition(position: MapCoordinate | null | undefined): position is MapCoordinate {
  return !!position && Number.isFinite(position.lat) && Number.isFinite(position.lng);
}

function fallbackCenter(markers: MapSurfaceMarker[], routes: MapSurfaceRoute[], circles: MapSurfaceCircle[], center?: MapCoordinate | null) {
  if (validPosition(center)) return center;
  const circle = circles.find((entry) => validPosition(entry.center));
  if (circle?.center) return circle.center;
  const marker = markers.find((entry) => validPosition(entry.position));
  if (marker?.position) return marker.position;
  const routePoint = routes.flatMap((route) => route.path).find(validPosition);
  return routePoint || DEFAULT_CENTER;
}

function extendCircleBounds(bounds: google.maps.LatLngBounds, center: MapCoordinate, radiusMeters: number) {
  const latDelta = radiusMeters / 111_320;
  const lngScale = Math.max(0.1, Math.cos(center.lat * Math.PI / 180));
  const lngDelta = radiusMeters / (111_320 * lngScale);
  bounds.extend({ lat: center.lat + latDelta, lng: center.lng + lngDelta });
  bounds.extend({ lat: center.lat - latDelta, lng: center.lng - lngDelta });
}

function createCircleInfo(circle: MapSurfaceCircle) {
  const root = document.createElement('div');
  root.style.font = '600 12px Inter, sans-serif';
  root.style.color = '#0F172A';
  root.style.padding = '2px 0';

  const label = document.createElement('div');
  label.textContent = circle.label;
  label.style.fontWeight = '800';
  label.style.marginBottom = circle.detail ? '3px' : '0';
  root.appendChild(label);

  if (circle.detail) {
    const detail = document.createElement('div');
    detail.textContent = circle.detail;
    detail.style.color = '#64748B';
    detail.style.fontWeight = '600';
    root.appendChild(detail);
  }

  return root;
}

export default function MapSurface({
  markers = [],
  routes = [],
  circles = [],
  highlightedCircleId,
  center,
  zoom = 11,
  fallback,
  height = '100%',
  minHeight = 320,
  theme,
  dark = false,
}: MapSurfaceProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRefs = useRef<google.maps.Marker[]>([]);
  const routeRefs = useRef<google.maps.Polyline[]>([]);
  const circleRefs = useRef<google.maps.Circle[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const resolvedCenter = useMemo(() => fallbackCenter(markers, routes, circles, center), [center, circles, markers, routes]);
  const useDarkStyles = theme ? theme === 'dark' : dark;

  useEffect(() => {
    let cancelled = false;
    getMapsApi()
      .then((maps) => {
        if (cancelled || !containerRef.current) return;
        if (!mapRef.current) {
          mapRef.current = new maps.maps.Map(containerRef.current, {
            center: resolvedCenter,
            zoom,
            disableDefaultUI: true,
            zoomControl: true,
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            styles: useDarkStyles ? [
              { elementType: 'geometry', stylers: [{ color: '#172033' }] },
              { elementType: 'labels.text.fill', stylers: [{ color: '#9BAFC5' }] },
              { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#26364f' }] },
              { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0F172A' }] },
            ] : undefined,
          });
        }
        setMapReady(true);
      })
      .catch(() => setLoadFailed(true));

    return () => {
      cancelled = true;
    };
  }, [resolvedCenter, useDarkStyles, zoom]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    markerRefs.current.forEach((marker) => marker.setMap(null));
    routeRefs.current.forEach((route) => route.setMap(null));
    circleRefs.current.forEach((circle) => circle.setMap(null));
    infoWindowRef.current?.close();
    markerRefs.current = [];
    routeRefs.current = [];
    circleRefs.current = [];

    const bounds = new google.maps.LatLngBounds();
    const focusedBounds = new google.maps.LatLngBounds();
    let hasBounds = false;
    let hasFocusedBounds = false;

    for (const circle of circles) {
      if (!validPosition(circle.center) || !Number.isFinite(circle.radiusMeters) || circle.radiusMeters <= 0) continue;
      const highlighted = circle.id === highlightedCircleId;
      const style = circleStyles[circle.tone || 'coverage'];
      extendCircleBounds(bounds, circle.center, circle.radiusMeters);
      if (highlighted) {
        extendCircleBounds(focusedBounds, circle.center, circle.radiusMeters);
        hasFocusedBounds = true;
      }
      hasBounds = true;
      const mapCircle = new google.maps.Circle({
        map,
        center: circle.center,
        radius: circle.radiusMeters,
        strokeColor: highlighted ? '#0F172A' : style.strokeColor,
        strokeOpacity: highlighted ? 0.95 : 0.74,
        strokeWeight: highlighted ? 3 : 2,
        fillColor: highlighted ? '#22C55E' : style.fillColor,
        fillOpacity: highlighted ? 0.18 : 0.12,
        clickable: true,
      });
      mapCircle.addListener('click', () => {
        if (!infoWindowRef.current) infoWindowRef.current = new google.maps.InfoWindow();
        infoWindowRef.current.setContent(createCircleInfo(circle));
        infoWindowRef.current.setPosition(circle.center!);
        infoWindowRef.current.open({ map });
      });
      circleRefs.current.push(mapCircle);
    }

    for (const route of routes) {
      const path = route.path.filter(validPosition);
      if (path.length < 2) continue;
      path.forEach((point) => {
        bounds.extend(point);
        hasBounds = true;
      });
      const style = routeStyles[route.tone || 'planned'];
      const polyline = new google.maps.Polyline({
        map,
        path,
        strokeColor: style.strokeColor,
        strokeOpacity: style.strokeOpacity,
        strokeWeight: style.strokeWeight,
        icons: style.strokeDasharray ? [{
          icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 3 },
          offset: '0',
          repeat: '16px',
        }] : undefined,
      });
      routeRefs.current.push(polyline);
    }

    for (const marker of markers) {
      if (!validPosition(marker.position)) continue;
      bounds.extend(marker.position);
      hasBounds = true;
      markerRefs.current.push(new google.maps.Marker({
        map,
        position: marker.position,
        title: marker.label,
        label: marker.label ? { text: marker.label.slice(0, 1).toUpperCase(), color: '#FFFFFF', fontWeight: '700' } : undefined,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 9,
          fillColor: markerColors[marker.tone || 'driver'],
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 3,
        },
      }));
    }

    if (hasFocusedBounds) {
      map.fitBounds(focusedBounds, 56);
    } else if (hasBounds) {
      map.fitBounds(bounds, 56);
    } else {
      map.setCenter(resolvedCenter);
      map.setZoom(zoom);
    }
  }, [circles, highlightedCircleId, mapReady, markers, resolvedCenter, routes, zoom]);

  if (loadFailed || !process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return fallback ? <>{fallback}</> : <FallbackMap height={height} minHeight={minHeight} />;
  }

  return <div ref={containerRef} style={{ width: '100%', height, minHeight, background: '#DDEAF6' }} />;
}

function FallbackMap({ height, minHeight }: { height: string | number; minHeight: string | number }) {
  return (
    <div style={{ width: '100%', height, minHeight, background: 'linear-gradient(135deg, #DDEAF6, #EEF6FF)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(37,99,235,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.12) 1px, transparent 1px)', backgroundSize: '42px 42px' }} />
      <div style={{ position: 'absolute', left: 20, bottom: 20, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.9)', color: '#0F172A', font: '600 12px Inter, sans-serif' }}>
        Google Maps unavailable
      </div>
    </div>
  );
}
