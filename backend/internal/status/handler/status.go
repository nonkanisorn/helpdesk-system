package handler

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/nonkanisorn/helpdesk-system/internal/domain"
	"github.com/nonkanisorn/helpdesk-system/internal/status/service"
)

type statusHandler struct {
	statusServ service.StatusService
}

type StatusRequest struct {
	StatusID   int
	StatusName string `json:"status_name"`
}

func NewStatusHandler(statusServ service.StatusService) statusHandler {
	return statusHandler{statusServ: statusServ}
}

func (s statusHandler) CreateStatus(c *fiber.Ctx) error {
	var statusRequset StatusRequest
	err := c.BodyParser(&statusRequset)
	if err != nil {
		return err
	}
	status, err := s.statusServ.CreateStatus(statusRequset.StatusName)
	if err != nil {
		return err
	}
	return c.JSON(status)
}

func (s statusHandler) GetStatusAll(c *fiber.Ctx) error {
	status, err := s.statusServ.GetStatusAll()
	if err != nil {
		return err
	}
	return c.JSON(status)
}

func (s statusHandler) DeleteStatusByID(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return err
	}
	err = s.statusServ.DeleteStatusByID(id)
	if err != nil {
		return err
	}
	return c.SendStatus(fiber.StatusNoContent)
}

func (s statusHandler) EditStatusByID(c *fiber.Ctx) error {
	statusID, err := strconv.Atoi(c.Params("statusID"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"error":   err.Error(),
		})
	}
	var statusReq domain.StatusRequest
	err = c.BodyParser(&statusReq)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"error":   err.Error(),
		})
	}
	status := domain.Status{
		StatusID:   statusID,
		StatusName: statusReq.StatusName,
	}
	err = s.statusServ.EditStatusByID(status)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"error":   err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
	})
}
