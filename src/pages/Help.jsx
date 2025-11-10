import React from "react";
import { Card, Accordion } from "react-bootstrap";
import "./Help.css";

const Help = () => {
  return (
    <div className="page-container-top">
      <div className="help-page-bg fade-in">
        <div className="help-container">
          <div className="help-header">
            <h2 style={{ color: "#8B4513" }}>Help & Guide</h2>
            <p style={{ color: "#A0522D" }}>
              Learn how to use the Event Manager app effectively
            </p>
          </div>

          <div className="help-cards-grid">
            <Card className="help-card">
              <Card.Header>
                <h5>Getting Started</h5>
              </Card.Header>
              <Card.Body>
                <ul>
                  <li>
                    Create an account by providing your name, email, username,
                    and password
                  </li>
                  <li>Log in to access your personal dashboard</li>
                  <li>Start creating and managing your events</li>
                </ul>
              </Card.Body>
            </Card>

            <Card className="help-card">
              <Card.Header>
                <h5>Quick Tips</h5>
              </Card.Header>
              <Card.Body>
                <ul>
                  <li>Use clear, descriptive names for your events</li>
                  <li>Add locations to help you remember where events are</li>
                  <li>Use the description field for additional details</li>
                  <li>Check your dashboard regularly for upcoming events</li>
                </ul>
              </Card.Body>
            </Card>
          </div>

          <Accordion className="fade-in">
            <Accordion.Item eventKey="0">
              <Accordion.Header>How to Register an Account</Accordion.Header>
              <Accordion.Body>
                <ol>
                  <li>Click on the "Register here" link on the login page</li>
                  <li>
                    Fill in all required fields: Full Name, Email, Username, and
                    Password
                  </li>
                  <li>Make sure your password is at least 6 characters long</li>
                  <li>Confirm your password by typing it again</li>
                  <li>Click "Register" to create your account</li>
                  <li>
                    You'll be automatically logged in and redirected to your
                    dashboard
                  </li>
                </ol>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>How to Create Events</Accordion.Header>
              <Accordion.Body>
                <ol>
                  <li>Navigate to your dashboard after logging in</li>
                  <li>
                    Click the "Add New Event" button or go to "Add Event" in the
                    navigation
                  </li>
                  <li>
                    Fill in the event details:
                    <ul>
                      <li>
                        <strong>Event Name:</strong> Give your event a clear,
                        descriptive name
                      </li>
                      <li>
                        <strong>Date:</strong> Select the date when your event
                        will occur
                      </li>
                      <li>
                        <strong>Time:</strong> Set the start time for your event
                      </li>
                      <li>
                        <strong>Location:</strong> Specify where the event will
                        take place
                      </li>
                      <li>
                        <strong>Description:</strong> Add any additional details
                        (optional)
                      </li>
                    </ul>
                  </li>
                  <li>Click "Create Event" to save your event</li>
                  <li>
                    You'll see a success message and be redirected to your
                    dashboard
                  </li>
                </ol>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>How to Edit Events</Accordion.Header>
              <Accordion.Body>
                <ol>
                  <li>Go to your dashboard to see all your events</li>
                  <li>Find the event you want to edit</li>
                  <li>Click the "Edit" button on the event card</li>
                  <li>Modify any of the event details as needed</li>
                  <li>Click "Update Event" to save your changes</li>
                  <li>
                    You'll see a confirmation message and be redirected to your
                    dashboard
                  </li>
                </ol>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>How to Delete Events</Accordion.Header>
              <Accordion.Body>
                <ol>
                  <li>Navigate to your dashboard</li>
                  <li>Find the event you want to delete</li>
                  <li>Click the "Delete" button on the event card</li>
                  <li>Confirm the deletion when prompted</li>
                  <li>
                    The event will be permanently removed from your account
                  </li>
                </ol>
                <div className="alert alert-warning mt-2">
                  <strong>Warning:</strong> Deleting an event is permanent and
                  cannot be undone.
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>Understanding Your Dashboard</Accordion.Header>
              <Accordion.Body>
                <p>Your dashboard is organized into three main sections:</p>
                <ul>
                  <li>
                    <strong>Upcoming Events:</strong> Shows events that haven't
                    occurred yet, sorted by date
                  </li>
                  <li>
                    <strong>Past Events:</strong> Shows events that have already
                    happened
                  </li>
                  <li>
                    <strong>All Events:</strong> Shows all your events in one
                    view
                  </li>
                </ul>
                <p>Each event card displays:</p>
                <ul>
                  <li>Event name and status badge (Upcoming/Past)</li>
                  <li>Date and time information</li>
                  <li>Location</li>
                  <li>Description (if provided)</li>
                  <li>Edit and Delete buttons for easy management</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header>Organizing Events Effectively</Accordion.Header>
              <Accordion.Body>
                <h6>Best Practices:</h6>
                <ul>
                  <li>
                    <strong>Use consistent naming:</strong> Develop a naming
                    convention for similar types of events
                  </li>
                  <li>
                    <strong>Include essential details:</strong> Always fill in
                    the location and time fields
                  </li>
                  <li>
                    <strong>Use descriptions wisely:</strong> Add important
                    details that don't fit elsewhere
                  </li>
                  <li>
                    <strong>Regular maintenance:</strong> Periodically review
                    and clean up old events
                  </li>
                  <li>
                    <strong>Plan ahead:</strong> Create events as soon as you
                    know about them
                  </li>
                </ul>
                <h6>Event Categories You Can Manage:</h6>
                <ul>
                  <li>Appointments (doctor visits, meetings, etc.)</li>
                  <li>Social gatherings (parties, dinners, etc.)</li>
                  <li>Work events (meetings, conferences, deadlines)</li>
                  <li>Personal reminders (birthdays, anniversaries)</li>
                  <li>
                    Recreational activities (sports, hobbies, entertainment)
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <Accordion.Header>Account Management</Accordion.Header>
              <Accordion.Body>
                <p>
                  <strong>Logging Out:</strong> Click the "Logout" button in the
                  top-right corner of the navigation bar.
                </p>
                <p>
                  <strong>Data Storage:</strong> Your account information and
                  events are stored locally in your browser. This means:
                </p>
                <ul>
                  <li>Your data is private and stays on your device</li>
                  <li>
                    Clearing your browser data will remove your account and
                    events
                  </li>
                  <li>
                    You can only access your events from the same browser and
                    device
                  </li>
                </ul>
                <div className="alert alert-info">
                  <strong>Note:</strong> This is a demo application. In a
                  production environment, your data would be securely stored on
                  servers and accessible from any device.
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Help;
