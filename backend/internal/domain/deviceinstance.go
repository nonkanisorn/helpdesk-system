package domain

type DeviceInstanceResponse struct {
	DeviceInstanceID int    `json:"device_instance_id"`
	DeviceID         *int   `json:"device_id"`
	SerialNumber     string `json:"serial_number"`
	DeviceName       int    `json:"device_name"`
	DepID            *int   `json:"dep_id"`
}
type DeviceInstanceCreateRequest struct {
	DeviceID     int    `json:"device_id"`
	DeviceNumber int    `json:"device_number"`
	DepID        int    `json:"dep_id"`
	SerialNumber string `json:"serial_number"`
}
