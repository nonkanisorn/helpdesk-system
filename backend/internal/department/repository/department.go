package repository

import "github.com/nonkanisorn/helpdesk-system/internal/domain"

type Department struct {
	DepartmentID   int64  `db:"dep_id"`
	DepartmentName string `db:"dep_name"`
}
type DepartmentRepository interface {
	GetAll() ([]Department, error)
	GetByID(int) (*Department, error)
	Create(string) error
	DeleteByID(int) error
	EditDepartmentByID(department domain.Department) error
}
