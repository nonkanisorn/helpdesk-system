package domain

type DeviceInstanceResponse struct {
	DeviceInstanceID int    `json:"device_instance_id"`
	DeviceID         *int   `json:"device_id"`
	SerialNumber     string `json:"serial_number"`
	DeviceName       int    `json:"device_name"`
	DepID            *int   `json:"dep_id"`
}
