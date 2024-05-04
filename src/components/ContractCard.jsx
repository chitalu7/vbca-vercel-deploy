// ContractCard code
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

import './ContractCard.css';

function ContractCard({ image, title, description, reward, trackLocation, atk, def, onTrack, onReset, onConfirmClose, contractStatus, trackingStatus }) {
  const [showTrack, setShowTrack] = useState(true);
  const [showEngage, setShowEngage] = useState(false);
  const [showDisengage, setShowDisengage] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleTrackClick = () => {
    onTrack();
    setShowTrack(false);
    setShowEngage(true);
  };

  const handleEngageClick = () => {
    setShowEngage(false);
    setShowDisengage(true);
  };

  const handleDisengageClick = () => {
    onReset();
    setShowTrack(true);
    setShowEngage(false);
    setShowDisengage(false);
  };

  const handleCloseContract = () => {
    setShowConfirmModal(true);
  };

  const handleCloseClick = () => {
    setShowConfirmModal(false);
  };

  const handleConfirmClose = () => {
    onConfirmClose();
    setShowTrack(true);
    setShowEngage(false);
    setShowDisengage(false);
    setShowConfirmModal(false);
  };

  return (
    <div>
      <Card className="contract-card">
        <div className="card-img-container">
          <Card.Img variant="top" src={image} />
          {contractStatus && (
            <div className="contract-overlay">
              <img src="/images/closed_contract-01.png" alt="Contract Closed" style={{ width: '100%', height: '100%', position: 'absolute', top: 0 }} />
            </div>
          )}
          {showDisengage && !contractStatus && (
            <Button className="close-button" variant="warning" onClick={handleCloseContract}>CLOSE?</Button>
          )}
        </div>
        <Card.Body className="contract-card-body">
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text><strong>Reward:</strong> {reward}</Card.Text>

          {showTrack && !contractStatus && !trackingStatus &&
            <Button variant="primary" onClick={handleTrackClick} disabled={trackingStatus}>TRACK?</Button>
          }

          {showEngage &&
            <>
              <Button variant="success" onClick={handleEngageClick}>ENGAGE?</Button>
              <Card.Text><strong>Location:</strong> {trackLocation}</Card.Text>
            </>
          }

          {showDisengage &&
            <>
              <Button variant="danger" onClick={handleDisengageClick}>DISENGAGE?</Button>
              <Card.Text><strong>Location:</strong> {trackLocation}</Card.Text>
              <Card.Text><strong>Attack:</strong> {atk}</Card.Text>
              <Card.Text><strong>Defense:</strong> {def}</Card.Text>
            </>
          }

          {!showDisengage && !contractStatus && (
            <div>
              <Link to="/dashboard">Back to Dashboard</Link>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={handleCloseClick}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Close</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to close this contract?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseClick}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmClose}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ContractCard;