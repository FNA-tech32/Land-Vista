import React, { useEffect, useRef } from 'react';
import * as mapboxgl from 'mapbox-gl';
import Footer from './Footer';
import Nav from './Nav';
import house1 from './images/house-img-1.webp';
import house2 from './images/house-img-1.webp';
import house3 from './images/hall-img-1.webp';
import house4 from './images/kitchen-img-1.webp';
import house5 from './images/bathroom-img-1.webp';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2h1YmhhbS0yMTA2IiwiYSI6ImNsanBkcWpzaDAyYzIzcG8wem80dTlwNGoifQ.Wq4Ac9g2DsvDZRsV9EjG1Q';

const View_property = () => {
    document.title = 'View Property | Land Vista';

    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);

    useEffect(() => {
        if (!mapContainerRef.current || mapInstanceRef.current) return;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/shubham-2106/clk28bv4k004s01pg6odn61bs',
            center: [75.808, 26.880],
            zoom: 10.50,
        });

        mapInstanceRef.current = map;

        map.on('load', () => {
            map.addSource('places', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [
                        // ...your existing features...
                    ],
                },
            });

            map.addLayer({
                id: 'places',
                type: 'symbol',
                source: 'places',
                layout: {
                    'icon-image': ['get', 'icon'],
                    'icon-allow-overlap': true,
                },
            });

            map.on('click', 'places', (e) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.description;

                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);
            });

            map.on('mouseenter', 'places', () => {
                map.getCanvas().style.cursor = 'pointer';
            });

            map.on('mouseleave', 'places', () => {
                map.getCanvas().style.cursor = '';
            });
        });

        map.addControl(new mapboxgl.NavigationControl());

        return () => {
            map.remove();
            mapInstanceRef.current = null;
        };
    }, []);

    return (
        <>
            <Nav />
            <section className="view-property">
                <div className="details">
                    <div className="thumb">
                        <div className="big-image">
                            <img src={house1} alt="" />
                        </div>
                        <div className="small-images">
                            <img src={house2} alt="" />
                            <img src={house3} alt="" />
                            <img src={house4} alt="" />
                            <img src={house5} alt="" />
                        </div>
                    </div>
                    <h3 className="name">Modern Flats and Appartments</h3>
                    <p className="location"><i className="fas fa-map-marker-alt"></i><span>Jaipur, India - 302001</span></p>
                    {/* ...rest of your details & amenities JSX... */}

                    <h1 className="title">Search on Map</h1>
                    <main className="pt-2">
                        <div className="Container">
                            <div id="map" ref={mapContainerRef} />
                        </div>
                    </main>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default View_property;