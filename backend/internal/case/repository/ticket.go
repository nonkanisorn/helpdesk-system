package repository

import (
	"time"
)

type CreateTicketRow struct {
	UserID            int    `db:"user_id"`
	StatusID          int    `db:"status_id"`
	Title             string `db:"title"`
	Description       string `db:"description"`
	IssueCategoriesID int    `db:"issue_categories_id"`
}
type UpdateTicketRow struct {
	TicketID     int  `db:"ticket_id"`
	StatusID     int  `db:"status_id"`
	TechnicianID *int `db:"technician_id"`
	ManagerID    *int `db:"manager_id"`
}
type TicketRow struct {
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

type TicketsForTechnicianRow struct {
	TicketID    int        `db:"ticket_id"`
	IssueName   string     `db:"issue_name"`
	FirstName   string     `db:"first_name"`
	LastName    string     `db:"last_name"`
	DepName     string     `db:"dep_name"`
	Phone       string     `db:"phone"`
	Description string     `db:"description"`
	Title       string     `db:"title"`
	CreatedAt   *time.Time `db:"created_at"`
	AssignedAt  *time.Time `db:"assigned_at"`
	StartAt     *time.Time `db:"started_at"`
	CompletedAt *time.Time `db:"completed_at"`
	ClosedAt    *time.Time `db:"closed_at"`
}
type TicketQueryRepository interface {
	AssignTechToTickets(int, int, int) error
	UpdateStatusTicket(*UpdateTicketRow) error
	GetTicketsByTechnicianID(int) ([]TicketRow, error)
	GetTicketForTechnicianByTicketID(int) (*TicketsForTechnicianRow, error)
	GetTicketsByUsersID(int) ([]TicketRow, error)
}
type TicketRepository interface {
	GetAllTickets() ([]TicketRow, error)
	GetTicketByID(int) (*TicketRow, error)
	CreateTicket(*CreateTicketRow) error
}
