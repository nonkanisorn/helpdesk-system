package domain

import "time"

type Tickets struct {
	TicketID          int        `db:"ticket_id"`
	Title             string     `db:"title"`
	Description       string     `db:"description"`
	ResolutionNote    *string    `db:"resolution_note"`
	IssueCategoriesID int        `db:"issue_categories_id"`
	InstanceID        *int       `db:"instance_id"`
	UserID            int        `db:"user_id"`
	TechnicianID      *int       `db:"technician_id"`
	ManagerID         *int       `db:"manager_id"`
	StatusID          int        `db:"status_id"`
	CreatedAt         time.Time  `db:"created_at"`
	AssignedDate      *time.Time `db:"assigned_at"`
	StartAt           *time.Time `db:"started_at"`
	CompletedAt       *time.Time `db:"completed_at"`
	ClosedAt          *time.Time `db:"closed_at"`
}
type TicketsResponse struct {
	TicketID          int        `json:"ticket_id"`
	Title             string     `json:"title"`
	Description       string     `json:"description"`
	ResolutionNote    *string    `json:"resolution_note"`
	IssueCategoriesID int        `json:"issue_categories_id"`
	InstanceID        *int       `json:"instance_id"`
	UserID            int        `json:"user_id"`
	TechnicianID      *int       `json:"technician_id"`
	ManagerID         *int       `json:"manager_id"`
	StatusID          int        `json:"status_id"`
	CreatedAt         time.Time  `json:"created_at"`
	AssignedDate      *time.Time `json:"assigned_at"`
	StartAt           *time.Time `json:"started_at"`
	CompletedAt       *time.Time `json:"completed_at"`
	ClosedAt          *time.Time `json:"closed_at"`
}
type TicketsForTechnicianResponse struct {
	TicketID    int        `json:"ticket_id"`
	IssueName   string     `json:"issue_name"`
	FirstName   string     `json:"first_name"`
	LastName    string     `json:"last_name"`
	DepName     string     `json:"dep_name"`
	Phone       string     `json:"phone"`
	Description string     `json:"description"`
	Title       string     `json:"title"`
	CreatedAt   *time.Time `json:"created_at"`
	AssignedAt  *time.Time `json:"assigned_at"`
	StartAt     *time.Time `json:"started_at"`
	CompletedAt *time.Time `json:"completed_at"`
	ClosedAt    *time.Time `json:"closed_at"`
}
type TicketsAssginTechRequest struct {
	TicketID int `json:"ticket_id"`
	// StatusID     int  `json:"status_id"`
	TechnicianID *int `json:"technician_id"`
	ManagerID    *int `json:"manager_id"`
}
