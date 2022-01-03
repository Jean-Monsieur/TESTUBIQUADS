import React, { FunctionComponent } from 'react';
import { Offcanvas, Spinner } from 'react-bootstrap';
import IdleDronesContainer from './IdleDronesContainer';

type IdleDronesLayoutProps = { title: string; loading: boolean; isShown: boolean; onClose: () => void };

const IdleDronesLayout: FunctionComponent<IdleDronesLayoutProps> = ({ title, isShown, loading, onClose }) => {
    return (
        <Offcanvas show={isShown} onHide={onClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    <h1>{title}</h1>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {loading ? <Spinner animation="border" variant="primary" /> : <IdleDronesContainer />}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default IdleDronesLayout;
