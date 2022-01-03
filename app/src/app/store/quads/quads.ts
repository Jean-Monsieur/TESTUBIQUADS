import Quad, { DroneStatus } from '../../types/quad';

const quads: Quad[] = [
    {
        manufacturer: 'Parrot',
        model: 'Anafi',
        maxFlightTime: 1500,
        charge: 0,
        status: DroneStatus.IDLE
    },
    {
        manufacturer: 'Yuneec',
        model: 'Breeze',
        maxFlightTime: 1320,
        charge: 100,
        status: DroneStatus.IDLE
    },
    {
        manufacturer: 'Cheerson',
        model: 'CX-STARS',
        maxFlightTime: 2040,
        charge: 98,
        status: DroneStatus.IDLE
    },
    {
        manufacturer: 'Cheerson',
        model: 'CX-32W',
        maxFlightTime: 420,
        charge: 72,
        status: DroneStatus.IDLE
    },
    {
        manufacturer: 'Cheerson',
        model: 'CX-20',
        maxFlightTime: 900,
        charge: 2,
        status: DroneStatus.IDLE
    },
    {
        manufacturer: 'Blade',
        model: 'Nano QX',
        maxFlightTime: 1680,
        charge: 52,
        status: DroneStatus.IDLE
    },
    {
        manufacturer: '3DR',
        model: 'Solo',
        maxFlightTime: 1200,
        charge: 60,
        status: DroneStatus.IDLE
    },
    {
        manufacturer: 'DJI',
        model: 'Mavic 2',
        maxFlightTime: 1860,
        charge: 52,
        status: DroneStatus.IDLE
    },
    {
        manufacturer: 'DJI',
        model: 'Spark',
        maxFlightTime: 960,
        charge: 100,
        status: DroneStatus.IDLE
    },
    {
        manufacturer: 'DJI',
        model: 'Phantom 4',
        maxFlightTime: 1680,
        charge: 93,
        status: DroneStatus.IDLE
    },
    {
        manufacturer: 'Halo',
        model: 'Drone Pro',
        maxFlightTime: 2700,
        charge: 80,
        status: DroneStatus.IDLE
    },
    {
        manufacturer: 'Halo',
        model: 'Stealth Pro',
        maxFlightTime: 1320,
        charge: 93,
        status: DroneStatus.IDLE
    },
    {
        manufacturer: 'JJRC',
        model: 'H78G',
        maxFlightTime: 900,
        charge: 93,
        status: DroneStatus.IDLE
    },
    {
        manufacturer: 'JJRC',
        model: 'H66',
        maxFlightTime: 360,
        charge: 3,
        status: DroneStatus.IDLE
    },
    {
        manufacturer: 'JJRC',
        model: 'X7',
        maxFlightTime: 1380,
        charge: 23,
        status: DroneStatus.IDLE
    },
    {
        manufacturer: 'Walkera',
        model: 'RODEO F110',
        maxFlightTime: 1620,
        charge: 70,
        status: DroneStatus.IDLE
    },
    {
        manufacturer: 'Walkera',
        model: 'RODEO F150',
        maxFlightTime: 1020,
        charge: 93,
        status: DroneStatus.IDLE
    },
    {
        manufacturer: 'Walkera',
        model: 'Phantom4',
        maxFlightTime: 1680,
        charge: 93,
        status: DroneStatus.IDLE
    },
    {
        manufacturer: 'JJRC',
        model: 'H42WH',
        maxFlightTime: 900,
        charge: 93,
        status: DroneStatus.IDLE
    },
    {
        manufacturer: 'JJRC',
        model: 'H40WH',
        maxFlightTime: 1080,
        charge: 93,
        status: DroneStatus.IDLE
    }
];

export default quads;
