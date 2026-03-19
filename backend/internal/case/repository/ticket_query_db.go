package repository

import (
	"fmt"
	"strings"
	"time"

	"github.com/jmoiron/sqlx"
)

type ticketQueryRepository struct {
	db *sqlx.DB
}

func NewTicketQueryRepository(db *sqlx.DB) TicketQueryRepository {
	return ticketQueryRepository{db: db}
}

func (t ticketQueryRepository) GetTicketsByTechnicianID(techID int) ([]TicketRow, error) {
	var tickets []TicketRow
	query := "select * from tickets t where t.technician_id = ?"
	err := t.db.Select(&tickets, query, techID)
	if err != nil {
		return nil, err
	}
	return tickets, nil
}

func (t ticketQueryRepository) GetTicketsByUsersID(usersID int) ([]TicketRow, error) {
	return nil, nil
}

func (t ticketQueryRepository) UpdateStatusTicket(updateTicketRow *UpdateTicketRow) error {
	setClauses := []string{"status_id = ? "}
	args := []any{updateTicketRow.StatusID}
	if updateTicketRow.ManagerID != nil {
		setClauses = append(setClauses, "manager_id = ? ")
		args = append(args, *updateTicketRow.ManagerID)
	}
	if updateTicketRow.TechnicianID != nil {
		setClauses = append(setClauses, "technician_id = ? ")
		args = append(args, *updateTicketRow.TechnicianID)
	}
	query := fmt.Sprintf("UPDATE tickets SET %v where ticket_id = ? ", strings.Join(setClauses, ", "))
	args = append(args, updateTicketRow.TicketID)
	_, err := t.db.Exec(query, args...)
	if err != nil {
		return err
	}
	return nil
}

func (t ticketQueryRepository) AssignTechToTickets(techID int, managerID int, tikcetID int) error {
	statusID := 2
	query := "update tickets t set technician_id = ?, manager_id = ?, status_id = ? , assigned_at = NOW() where ticket_id = ?"
	_, err := t.db.Exec(query, techID, managerID, statusID, tikcetID)
	if err != nil {
		return err
	}
	return nil
}

func (t ticketQueryRepository) GetTicketForTechnicianByTicketID(ticketID int) (*TicketsForTechnicianRow, error) {
	var ticket TicketsForTechnicianRow
	query := "select t.ticket_id,u.first_name ,u.last_name  ,u.phone, t.description ,t.title ,t.created_at,t.assigned_at,t.completed_at ,t.closed_at  ,d.dep_name, ic.issue_name  from tickets t  join users u on t.user_id = u.id join departments d on u.department_id = d.dep_id join issue_categories ic    on t.issue_categories_id  = ic.id     where t.ticket_id  = ?"
	err := t.db.Get(&ticket, query, ticketID)
	if err != nil {
		return nil, err
	}
	return &ticket, nil
}
func (t ticketQueryRepository) UpdateStatusTicketByTechnician(ticket *TicketRow) error {
	if ticket.ResolutionNote != nil {
		query := "UPDATE  tickets SET resolution_note = ? ,instance_id = ?,status_id = ? ,completed_at = ?  WHERE ticket_id = ? "
		completedAt := time.Now()
		statusID := 4
		_, err := t.db.Exec(query, ticket.ResolutionNote, ticket.InstanceID, statusID, completedAt, ticket.TicketID)
		if err != nil {
			return err
		}
		return nil
	}

	query := "UPDATE  tickets SET status_id = ? ,started_at = ?  WHERE ticket_id = ? "
	statusID := 3
	startedAt := time.Now()
	_, err := t.db.Exec(query, statusID, startedAt, ticket.TicketID)
	if err != nil {
		return err
	}
	return nil

}
func (t ticketQueryRepository) UpdateStatusCompleteByTechnician(ticket *TicketRow) error {
	query := "UPDATE  tickets SET resolution_note = ? ,instance_id = ?,status_id = ? ,completed_at = ?  WHERE ticket_id = ? "
	_, err := t.db.Exec(query, ticket.ResolutionNote, ticket.InstanceID, ticket.StatusID, ticket.CompletedAt, ticket.TicketID)
	if err != nil {
		return err
	}
	return nil
}
func (t ticketQueryRepository) GetLatestTickets(userID int, limit int) ([]TicketRow, error) {
	var tickets []TicketRow
	query := "SELECT * FROM tickets WHERE user_id = ?  ORDER BY created_at DESC LIMIT ? "
	err := t.db.Select(&tickets, query, userID, limit)
	if err != nil {
		return nil, err
	}
	return tickets, nil
}
