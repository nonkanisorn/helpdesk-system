package repository

type Device struct {
	DeviceID   int64  `db:"dev_id"`
	DeviceName string `db:"dev_name"`
	DeviceType int    `db:"dev_type"`
}
type DeviceRepository interface {
	GetAll() ([]Device, error)
	Create(string, int) error
	Delete(int) error
	// GetByID() (Device, error)
}
