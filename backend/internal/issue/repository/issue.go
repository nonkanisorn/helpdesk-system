package repository

import "github.com/nonkanisorn/helpdesk-system/internal/domain"

type Issue struct {
	ID        int    `db:"id"`
	IssueName string `db:"issue_name"`
}
type IssueRepository interface {
	GetAll() ([]Issue, error)
	Create(string) error
	DeleteIssuesByID(int) error
	EditIssueByID(issue domain.Issue) error
}
