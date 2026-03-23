package service

import (
	"fmt"

	"github.com/nonkanisorn/helpdesk-system/internal/case/repository"
	"github.com/nonkanisorn/helpdesk-system/internal/domain"

	deviceInstanceQueryRepo "github.com/nonkanisorn/helpdesk-system/internal/device/device_instance/repository"
)

type ticketQueryService struct {
	ticketRepo              repository.TicketQueryRepository
	deviceInstanceQueryRepo deviceInstanceQueryRepo.DeviceInstanceQueryRepository
}

func NewTicketQueryService(ticketRepo repository.TicketQueryRepository) ticketQueryService {
	return ticketQueryService{ticketRepo: ticketRepo}
}

func toDB(updateTicketRequest *domain.UpdateTicketRequest) *repository.UpdateTicketRow {
	ticketRowMap := repository.UpdateTicketRow{
		TicketID:     updateTicketRequest.TicketID,
		StatusID:     updateTicketRequest.StatusID,
		ManagerID:    updateTicketRequest.ManagerID,
		TechnicianID: updateTicketRequest.TechnicianID,
	}
	return &ticketRowMap
}

func toRes(ticketRow []repository.TicketRow) ([]domain.TicketsResponse, error) {
	ticketRes := []domain.TicketsResponse{}
	for _, v := range ticketRow {
		ticket := domain.TicketsResponse{
			TicketID:          v.TicketID,
			Title:             v.Title,
			Description:       v.Description,
			ResolutionNote:    v.ResolutionNote,
			IssueCategoriesID: v.IssueCategoriesID,
			InstanceID:        v.InstanceID,
			UserID:            v.UserID,
			TechnicianID:      v.TechnicianID,
			ManagerID:         v.ManagerID,
			StatusID:          v.StatusID,
			CreatedAt:         v.CreatedAt,
			AssignedDate:      v.AssignedDate,
			StartAt:           v.StartAt,
			CompletedAt:       v.CompletedAt,
			ClosedAt:          v.ClosedAt,
		}
		ticketRes = append(ticketRes, ticket)
	}
	// fmt.Println("ticketRow", ticketRow)
	return ticketRes, nil
}

func (t ticketQueryService) GetTicketsByTechnicianID(id int) ([]domain.TicketsResponse, error) {
	ticketResDTO := []domain.TicketsResponse{}
	tickets, err := t.ticketRepo.GetTicketsByTechnicianID(id)
	if err != nil {
		return nil, err
	}
	ticketResDTO, err = toRes(tickets)
	if err != nil {
		return nil, err
	}
	fmt.Println("tickkettt", ticketResDTO)
	return ticketResDTO, nil
}

func (t ticketQueryService) UpdateStatusTicket(updateTicketRequest *domain.UpdateTicketRequest) error {
	updateStatusTicket := toDB(updateTicketRequest)
	if updateTicketRequest.ManagerID != nil {
		updateStatusTicket.ManagerID = updateTicketRequest.ManagerID
	}
	if updateTicketRequest.TechnicianID != nil {
		updateStatusTicket.TechnicianID = updateTicketRequest.TechnicianID
	}
	err := t.ticketRepo.UpdateStatusTicket(updateStatusTicket)
	if err != nil {
		return err

	}
	return nil
}

func (t ticketQueryService) AssignTechToTicket(technicianID int, managerID int, ticketID int) error {
	fmt.Println("daszxc", technicianID)
	err := t.ticketRepo.AssignTechToTickets(technicianID, managerID, ticketID)
	if err != nil {
		return err
	}

	return nil

}

func (t ticketQueryService) GetTicketForTechnicianByTicketID(ticketID int) (*domain.TicketsForTechnicianResponse, error) {
	ticketRow, err := t.ticketRepo.GetTicketForTechnicianByTicketID(ticketID)
	if err != nil {
		return nil, err
	}
	ticketRes := domain.TicketsForTechnicianResponse{
		TicketID:    ticketRow.TicketID,
		IssueName:   ticketRow.IssueName,
		FirstName:   ticketRow.FirstName,
		LastName:    ticketRow.LastName,
		DepName:     ticketRow.DepName,
		Phone:       ticketRow.Phone,
		Description: ticketRow.Description,
		Title:       ticketRow.Title,
		CreatedAt:   ticketRow.ClosedAt,
		AssignedAt:  ticketRow.AssignedAt,
		StartAt:     ticketRow.StartAt,
		CompletedAt: ticketRow.CompletedAt,
		ClosedAt:    ticketRow.ClosedAt,
	}
	return &ticketRes, nil
}
func (t ticketQueryService) UpdateStatusCompleteByTechnician(serialNumber string) error {
	deviceInstanceRow, err := t.deviceInstanceQueryRepo.CheckSerialNumber(serialNumber)
	if err != nil {
		return err
	}
	fmt.Println(deviceInstanceRow)
	return nil
}
func (t ticketQueryService) GetLatestTickets(userID int, limit int) ([]domain.TicketsResponse, error) {
	tickets, err := t.ticketRepo.GetLatestTickets(userID, limit)
	if err != nil {
		return nil, err
	}
	ticketsResponse, err := toRes(tickets)
	return ticketsResponse, nil
}
func (t ticketQueryService) GetTicketsByStatusID(statusID int) ([]domain.TicketsResponse, error) {
	ticketsFromDB, err := t.ticketRepo.GetTicketsByStatusID(statusID)
	if err != nil {
		return nil, err
	}
	tickets, err := toRes(ticketsFromDB)
	if err != nil {
		return nil, err
	}
	return tickets, nil
}
