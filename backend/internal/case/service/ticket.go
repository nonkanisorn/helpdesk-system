package service

import "github.com/nonkanisorn/helpdesk-system/internal/domain"

type TicketService interface {
	CreateTicket(*domain.CreateTicketRequest) error
	GetAllTickets() ([]domain.TicketsResponse, error)
	GetTicketByID(int) (*domain.TicketsResponse, error)
}
type TicketQueryService interface {
	GetTicketsByTechnicianID(int) ([]domain.TicketsResponse, error)
	UpdateStatusTicket(*domain.UpdateTicketRequest) error
	AssignTechToTicket(int, int, int) error
	GetTicketForTechnicianByTicketID(int) (*domain.TicketsForTechnicianResponse, error)
	UpdateStatusCompleteByTechnician(string) error
	StartJobByTechnicianID(int) error
	CompletedJobByTechnician(int, string, string) error
	ConfirmAndCloseTicketByUser(int) error
	GetLatestTickets(int, int) ([]domain.TicketsResponse, error)
	GetTicketsByStatusID(int) ([]domain.TicketsResponse, error)
	GetTicketsByUsersID(int) ([]domain.TicketsResponse, error)
}
