import React, { useEffect, useRef } from 'react';
import * as mapboxgl from 'mapbox-gl';
import Footer from './Footer';
import Nav from './Nav';
import house1 from './img/1-1.jpg';
import house2 from './img/1-2.jpg';
import house3 from './img/1-3.jpg';
import house4 from './img/1-4.jpg';
import house5 from './img/1-5.jpg';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2h1YmhhbS0yMTA2IiwiYSI6ImNsanBkcWpzaDAyYzIzcG8wem80dTlwNGoifQ.Wq4Ac9g2DsvDZRsV9EjG1Q';

const PLACES_GEOJSON = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {
                description:
                    '<strong>Modern Flats and Apartments</strong><p><a href="view_property.html" target="_blank" title="Opens in a new window">Modern Flats and Apartments</a></p>',
                icon: 'marker-editor'
            },
            geometry: {
                type: 'Point',
                coordinates: [77.272205, 28.795902]
            }
        },
        {
            type: 'Feature',
            properties: {
                description:
                    '<strong>Modern Flats and Apartments</strong><p><a href="view_property1.html" target="_blank" title="Opens in a new window">Modern Flats and Apartments</a></p>',
                icon: 'marker-editor'
            },
            geometry: {
                type: 'Point',
                coordinates: [77.279034, 28.792362]
            }
        },
        {
            type: 'Feature',
            properties: {
                description:
                    '<strong>Modern Flats and Apartments</strong><p><a href="view_property2.html" target="_blank" title="Opens in a new window">Modern Flats and Apartments</a></p>',
                icon: 'marker-editor'
            },
            geometry: {
                type: 'Point',
                coordinates: [77.272769, 28.777844]
            }
        },
        {
            type: 'Feature',
            properties: {
                description:
                    '<strong>Modern Flats and Apartments</strong><p><a href="view_property3.html" target="_blank" title="Opens in a new window">Modern Flats and Apartments</a></p>',
                icon: 'marker-editor'
            },
            geometry: {
                type: 'Point',
                coordinates: [77.284270, 28.782959]
            }
        },
        {
            type: 'Feature',
            properties: {
                description:
                    '<strong>Modern Flats and Apartments</strong><p><a href="view_property4.html" target="_blank" title="Opens in a new window">Modern Flats and Apartments</a></p>',
                icon: 'marker-editor'
            },
            geometry: {
                type: 'Point',
                coordinates: [77.288304, 28.772202]
            }
        },
        {
            type: 'Feature',
            properties: {
                description:
                    '<strong>Modern Flats and Apartments</strong><p><a href="view_property5.html" target="_blank" title="Opens in a new window">Modern Flats and Apartments</a></p>',
                icon: 'marker-editor'
            },
            geometry: {
                type: 'Point',
                coordinates: [77.249080, 28.780402]
            }
        },
        {
            type: 'Feature',
            properties: {
                description:
                    '<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist <a href="http://www.muhsinah.com" target="_blank" title="Opens in a new window">Muhsinah</a> plays the <a href="http://www.blackcatdc.com">Black Cat</a> (1811 14th Street NW) tonight with <a href="http://www.exitclov.com" target="_blank" title="Opens in a new window">Exit Clov</a> and <a href="http://godsilla.bandcamp.com" target="_blank" title="Opens in a new window">Gods’illa</a>. 9:00 p.m. $12.</p>',
                icon: 'music'
            },
            geometry: {
                type: 'Point',
                coordinates: [77.251397, 28.776565]
            }
        }
    ]
};

const View_property2 = () => {
    document.title = 'View Property | Land Vista';

    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);

    useEffect(() => {
        if (!mapContainerRef.current || mapInstanceRef.current) return;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/shubham-2106/clk28bv4k004s01pg6odn61bs',
            center: [77.279034, 28.792362],
            zoom: 10.50,
        });

        mapInstanceRef.current = map;

        map.on('load', () => {
            map.addSource('places', {
                type: 'geojson',
                data: PLACES_GEOJSON,
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

        map.on('click', (event) => {
            const features = map.queryRenderedFeatures(event.point, {
                layers: ['map_1'],
            });
            if (!features.length) {
                return;
            }
            const feature = features[0];

            new mapboxgl.Popup({ offset: [0, -15] })
                .setLngLat(feature.geometry.coordinates)
                .setHTML(
                    `<h3>${feature.properties.title}</h3>
                    <p>${feature.properties.description}</p>`
                )
                .addTo(map);
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
                    <p className="location"><i className="fas fa-map-marker-alt"></i><span>Delhi, India</span></p>
                    <div className="info">
                        <p><i className="fas fa-tag"></i><span>22.5 lac</span></p>
                        <p><i className="fas fa-user"></i><span>Rahul (owner)</span></p>
                        <p><i className="fas fa-phone"></i><a href="tel:+919829055120">+91 98290 55120</a></p>
                        <p><i className="fas fa-building"></i><span>Flat</span></p>
                        <p><i className="fas fa-house"></i><span>Sale</span></p>
                        <p><i className="fas fa-calendar"></i><span>10-01-2023</span></p>
                    </div>
                    <h3 className="title">Details</h3>
                    <div className="flex">
                        <div className="box">
                            <p><i>Rooms :</i><span>4 BHK</span></p>
                            <p><i>Deposit amount :</i><span>0</span></p>
                            <p><i>Status :</i><span>Ready to move</span></p>
                            <p><i>Bedroom :</i><span>4</span></p>
                            <p><i>Bathroom :</i><span>5</span></p>
                            <p><i>Balcony :</i><span>3</span></p>
                        </div>
                        <div className="box">
                            <p><i>Carpet area :</i><span>1100sqft</span></p>
                            <p><i>Age :</i><span>3 years</span></p>
                            <p><i>Room floor :</i><span>3</span></p>
                            <p><i>Total floors :</i><span>22</span></p>
                            <p><i>Furnished :</i><span>Semi-furnished</span></p>
                            <p><i>Loan :</i><span>Available</span></p>
                        </div>
                    </div>
                    <h3 className="title">Amenities</h3>
                    <div className="flex">
                        <div className="box">
                            <p><i className="fas fa-check"></i><span>Lifts</span></p>
                            <p><i className="fas fa-check"></i><span>Security guards</span></p>
                            <p><i className="fas fa-times"></i><span>Play ground</span></p>
                            <p><i className="fas fa-check"></i><span>Gardens</span></p>
                            <p><i className="fas fa-check"></i><span>Water supply</span></p>
                            <p><i className="fas fa-check"></i><span>Power backup</span></p>
                        </div>
                        <div className="box">
                            <p><i className="fas fa-check"></i><span>Parking area</span></p>
                            <p><i className="fas fa-times"></i><span>Gym</span></p>
                            <p><i className="fas fa-check"></i><span>Shopping mall</span></p>
                            <p><i className="fas fa-check"></i><span>Hospital</span></p>
                            <p><i className="fas fa-check"></i><span>Schools</span></p>
                            <p><i className="fas fa-check"></i><span>Market area</span></p>
                        </div>
                    </div>
                    <h3 className="title">Description</h3>
                    <p className="description">It is a very budget friendly appartment you will get.</p>
                    <form action="" method="post">
                        <input type="submit" value="save property" name="save" className="inline-btn" />
                    </form><br /><br /><br /><br />
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

export default View_property2;