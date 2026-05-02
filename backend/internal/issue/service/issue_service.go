package service

import (
	"fmt"

	"github.com/nonkanisorn/helpdesk-system/internal/domain"
	"github.com/nonkanisorn/helpdesk-system/internal/issue/repository"
)

type issueService struct {
	IssueRepo repository.IssueRepository
}

func NewIssueService(IssueRepo repository.IssueRepository) IssueService {
	return issueService{IssueRepo: IssueRepo}
}

func (i issueService) GetAllIssues() ([]IssueResponse, error) {
	issues, err := i.IssueRepo.GetAll()
	if err != nil {
		return nil, err
	}
	var issuesResponse []IssueResponse
	for _, issue := range issues {
		issueforappend := IssueResponse{
			ID:        issue.ID,
			IssueName: issue.IssueName,
		}
		issuesResponse = append(issuesResponse, issueforappend)

	}
	return issuesResponse, nil
}

func (i issueService) Create(issuesCategoriesName string) error {
	err := i.IssueRepo.Create(issuesCategoriesName)
	if err != nil {
		return err
	}
	return nil
}

func (i issueService) DeleteIssuesByID(issuesCategoriesID int) error {
	err := i.IssueRepo.DeleteIssuesByID(issuesCategoriesID)
	if err != nil {
		return err
	}
	return nil
}

func (i issueService) EditIssueByID(issue domain.Issue) error {
	fmt.Println("from serivce", issue.IssuesCategoriesName)
	err := i.IssueRepo.EditIssueByID(issue)
	if err != nil {
		return err
	}
	return nil
}
