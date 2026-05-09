package handler

import (
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/nonkanisorn/helpdesk-system/internal/domain"
	"github.com/nonkanisorn/helpdesk-system/internal/issue/service"
)

type issueHandler struct {
	issueServ service.IssueService
}

func NewIssueHandler(issueServ service.IssueService) issueHandler {
	return issueHandler{issueServ: issueServ}
}

func (s issueHandler) GetAllIssues(c *fiber.Ctx) error {
	issues, err := s.issueServ.GetAllIssues()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data": issues,
	})
}

func (s issueHandler) Create(c *fiber.Ctx) error {
	var req domain.IssuesCreateRequest
	err := c.BodyParser(&req)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
	}
	err = s.issueServ.Create(req.IssuesCategoriesName)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"sucess": true,
	})
}

func (s issueHandler) DeleteIssuesByID(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("issuesCategoriesID"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	err = s.issueServ.DeleteIssuesByID(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"sucess": true,
	})
}

func (s issueHandler) EditIssueByID(c *fiber.Ctx) error {
	issueID, err := strconv.Atoi(c.Params("issuesCategoriesID"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	var issueReq domain.EditIssueRequest
	err = c.BodyParser(&issueReq)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	issue := domain.Issue{
		IssuesCategoriesID:   issueID,
		IssuesCategoriesName: issueReq.IssuesCategoriesName,
	}
	fmt.Println("from handler", issueReq.IssuesCategoriesName)
	err = s.issueServ.EditIssueByID(issue)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"sucess": true,
	})
}
