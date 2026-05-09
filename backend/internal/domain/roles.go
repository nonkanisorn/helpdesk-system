package domain

type CreateRolesRequest struct {
	RoleName string `json:"role_name"`
}
type EditRoleRequest struct {
	RoleName string `json:"role_name"`
}
type Role struct {
	RoleID   int
	RoleName string
}
