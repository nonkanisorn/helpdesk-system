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
	GetLatestTickets(int, int) ([]domain.TicketsResponse, error)
}
