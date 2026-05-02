package repository

type DeviceInstance struct {
	DeviceInstanceID *int   `db:"instance_id"`
	DeviceID         *int   `db:"device_id"`
	SerialNumber     string `db:"serial_number"`
	DeviceName       int    `db:"device_number"`
	DepID            *int   `db:"dep_id"`
}

type DeviceInstanceRow struct {
	DeviceInstanceID *int   `db:"instance_id"`
	DeviceID         *int   `db:"device_id"`
	SerialNumber     string `db:"serial_number"`
	DeviceName       int    `db:"device_number"`
	DepID            *int   `db:"dep_id"`
}
type DeviceInstanceRepository interface {
	GetAll() ([]DeviceInstance, error)
	Create(int, int, int, string) error
	DeleteDeviceInstanceByID(int) error
}
type DeviceInstanceQueryRepository interface {
	CheckSerialNumber(string) (int, error)
}
