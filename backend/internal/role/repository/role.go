package repository

import "github.com/nonkanisorn/helpdesk-system/internal/domain"

type RoleRow struct {
	RoleID   int    `db:"role_id"`
	RoleName string `db:"role_name"`
}
type RoleRepository interface {
	GetAll() ([]RoleRow, error)
	GetByID(int) (*RoleRow, error)
	Create(string) error
	DeleteByID(int) error
	EditRoleByRoleID(role domain.Role) error
}
