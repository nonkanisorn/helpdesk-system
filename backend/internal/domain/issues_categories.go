package domain

type IssuesCreateRequest struct {
	IssuesCategoriesID   int    `json:"id"`
	IssuesCategoriesName string `json:"issues_name"`
}
type Issue struct {
	IssuesCategoriesID   int    `json:"id"`
	IssuesCategoriesName string `json:"issues_name"`
}
type EditIssueRequest struct {
	IssuesCategoriesID   int    `json:"id"`
	IssuesCategoriesName string `json:"issues_name"`
}
