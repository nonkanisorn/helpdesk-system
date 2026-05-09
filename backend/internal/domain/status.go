package domain

type Status struct {
	StatusID   int    `json:"status_id"`
	StatusName string `json:"status_name"`
}
type StatusRequest struct {
	StatusName string `json:"status_name"`
}
