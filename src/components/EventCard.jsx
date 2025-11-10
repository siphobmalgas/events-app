import React, { useState } from "react";
import { Card, Button, Badge, Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEvents } from "../contexts/event";
import "./EventCard.css";

const EventCard = ({ event }) => {
  const { deleteEvent } = useEvents();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(event.id);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isUpcoming = () => {
    const eventDate = new Date(event.date);
    const now = new Date();
    return eventDate >= now;
  };

  return (
    <Card className="event-card">
      <Card.Header>
        <div className="event-card-header-content">
          <div className="event-card-title">
            <span title={event.name}>
              <strong>{event.name}</strong>
            </span>
            <Badge bg={isUpcoming() ? "success" : "secondary"}>
              {isUpcoming() ? "Upcoming" : "Past"}
            </Badge>
          </div>
          <div
            className="event-card-actions"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              as={Link}
              to={`/edit-event/${event.id}`}
              className="event-action-btn edit-btn"
            >
              Edit
            </Button>
            <Button
              className="event-action-btn delete-btn"
              onClick={handleDelete}
            >
              Delete
            </Button>
            <button
              className="event-card-arrow-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              aria-label={
                isExpanded ? "Collapse event details" : "Expand event details"
              }
            >
              {isExpanded ? "▼" : "▶"}
            </button>
          </div>
        </div>
      </Card.Header>
      <Collapse in={isExpanded}>
        <div>
          <Card.Body>
            <div className="event-details">
              <div className="event-detail-item">
                <strong>� Event:</strong> {event.name}
              </div>
              <div className="event-detail-item">
                <strong>📅 Date:</strong> {formatDate(event.date)}
              </div>
              <div className="event-detail-item">
                <strong>🕒 Time:</strong> {formatTime(event.time)}
              </div>
              <div className="event-detail-item">
                <strong>📍 Location:</strong> {event.location}
              </div>
              {event.description && (
                <div className="event-detail-item">
                  <strong>📝 Description:</strong>
                  <div className="event-description">{event.description}</div>
                </div>
              )}
            </div>
          </Card.Body>
        </div>
      </Collapse>
    </Card>
  );
};

export default EventCard;
