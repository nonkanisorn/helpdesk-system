package repository

import "github.com/nonkanisorn/helpdesk-system/internal/domain"

type DeviceType struct {
	DeviceTypeID   int64  `db:"devicetype_id"`
	DeviceTypeName string `db:"devicetype_name"`
}
type DeviceTypeRepository interface {
	GetAll() ([]DeviceType, error)
	Create(string) error
	DeleteDeviceTypeByID(int) error
	EditDeviceTypeByID(deviceType domain.DeviceType) error
}
