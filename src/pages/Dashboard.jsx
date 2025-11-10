import React, { useState } from "react";
import { Button, Nav, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEvents } from "../contexts/event";
import EventCard from "../components/EventCard";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const { events, getUpcomingEvents, getPastEvents } = useEvents();

  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  // Filter events based on search query
  const filterEvents = (eventsList) => {
    if (!searchQuery.trim()) {
      return eventsList;
    }

    const query = searchQuery.toLowerCase();
    return eventsList.filter(
      (event) =>
        event.name.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        (event.description && event.description.toLowerCase().includes(query))
    );
  };

  const renderEventList = (eventsList) => {
    const filteredEvents = filterEvents(eventsList);

    if (filteredEvents.length === 0) {
      return (
        <Alert variant="info" className="text-center">
          <h5>No events found</h5>
          <p>
            {searchQuery.trim()
              ? `No events match "${searchQuery}". Try a different search term.`
              : activeTab === "upcoming"
              ? "You don't have any upcoming events. "
              : "You don't have any past events. "}
            {!searchQuery.trim() && (
              <Link to="/add-event">Create your first event</Link>
            )}
          </p>
        </Alert>
      );
    }

    return (
      <div className="dashboard-grid">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    );
  };

  return (
    <div className="page-container-top">
      <div className="dashboard-container fade-in">
        {/* Header with tabs on the right */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Event Planner</h1>
          <div className="dashboard-tabs-top">
            <Nav variant="pills" activeKey={activeTab} onSelect={setActiveTab}>
              <Nav.Item>
                <Nav.Link eventKey="upcoming" className="mx-1">
                  Upcoming ({upcomingEvents.length})
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="past" className="mx-1">
                  Past ({pastEvents.length})
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="all" className="mx-1">
                  All ({events.length})
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>

        <input
          type="text"
          className="dashboard-search"
          placeholder="🔍 Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Event list based on active tab */}
        {activeTab === "upcoming" && renderEventList(upcomingEvents)}
        {activeTab === "past" && renderEventList(pastEvents)}
        {activeTab === "all" && renderEventList(events)}

        <Button
          as={Link}
          to="/add-event"
          variant="primary"
          size="lg"
          className="mt-4"
        >
          Add New Event
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav"></div>
    </div>
  );
};

export default Dashboard;
