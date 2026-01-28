package repository

import (
	"time"

	"github.com/jmoiron/sqlx"
)

type ticketRepositoryDB struct {
	db *sqlx.DB
}

func NewTicketRepository(db *sqlx.DB) TicketRepository {
	return &ticketRepositoryDB{db: db}
}

func (t ticketRepositoryDB) CreateTicket(ticket *CreateTicketRow) error {
	query := "INSERT INTO tickets( title,description, issue_categories_id,user_id,status_id,created_at ) VALUES(?, ?, ?, ?, ?,?)"
	_, err := t.db.Exec(query, ticket.Title, ticket.Description, ticket.IssueCategoriesID, ticket.UserID, ticket.StatusID, time.Now())
	if err != nil {
		return err
	}
	return nil
}

func (t ticketRepositoryDB) GetAllTickets() ([]TicketRow, error) {
	var ticket []TicketRow
	query := "SELECT * from tickets"
	err := t.db.Select(&ticket, query)
	if err != nil {
		return nil, err
	}
	return ticket, nil
}

func (t ticketRepositoryDB) GetTicketByID(id int) (*TicketRow, error) {
	ticket := TicketRow{}
	query := "SELECT ticket_id, title, description, resolution_note, issue_categories_id, instance_id, user_id, technician_id, manager_id, status_id, created_at, assigned_at, started_at, completed_at, closed_at FROM tickets WHERE ticket_id = ? "
	err := t.db.Get(&ticket, query, id)
	if err != nil {
		return nil, err
	}
	return &ticket, nil
}
