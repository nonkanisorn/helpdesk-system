package service

import "github.com/nonkanisorn/helpdesk-system/internal/domain"

type IssueResponse struct {
	ID        int    `db:"id" json:"issues_id"`
	IssueName string `db:"issue_name" json:"issues_name"`
}
type IssueService interface {
	GetAllIssues() ([]IssueResponse, error)
	Create(string) error
	DeleteIssuesByID(int) error
	EditIssueByID(issue domain.Issue) error
}
