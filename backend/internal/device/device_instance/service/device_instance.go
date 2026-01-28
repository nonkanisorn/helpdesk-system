package service

type DeviceInstanceResponse struct {
	DeviceInstanceID *int   `db:"instance_id"`
	DeviceID         *int   `db:"device_id"`
	SerialNumber     string `db:"serial_number"`
	DeviceName       int    `db:"device_number"`
	DepID            *int   `db:"dep_id"`
}
type DeviceInstanceService interface {
	GetAllDeviceInstance() ([]DeviceInstanceResponse, error)
}
