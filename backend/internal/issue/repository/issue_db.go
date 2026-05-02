package repository

import (
	"github.com/jmoiron/sqlx"
	"github.com/nonkanisorn/helpdesk-system/internal/domain"
)

type issueRepositoryDB struct {
	db *sqlx.DB
}

func NewIssueRepository(db *sqlx.DB) IssueRepository {
	return issueRepositoryDB{db: db}
}

func (i issueRepositoryDB) GetAll() ([]Issue, error) {
	var issues []Issue
	query := "select id,issue_name from issue_categories"
	err := i.db.Select(&issues, query)
	if err != nil {
		return nil, err
	}
	return issues, nil
}

func (i issueRepositoryDB) Create(issuesName string) error {
	query := "insert into issue_categories(issue_name)values(?)"
	_, err := i.db.Exec(query, issuesName)
	if err != nil {
		return err
	}
	return nil
}

func (i issueRepositoryDB) DeleteIssuesByID(issuesCategoriesID int) error {
	query := "delete from issue_categories where id = ? "
	_, err := i.db.Exec(query, issuesCategoriesID)
	if err != nil {
		return err
	}
	return nil
}

func (i issueRepositoryDB) EditIssueByID(issue domain.Issue) error {
	query := "update issue_categories set issue_name = ? where id = ?"
	_, err := i.db.Exec(query, issue.IssuesCategoriesName, issue.IssuesCategoriesID)
	if err != nil {
		return err
	}
	return nil
}
