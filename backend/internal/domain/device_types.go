package domain

type DeviceTypeRequest struct {
	DeviceTypeID   int    `json:"devicetype_id"`
	DeviceTypeName string `json:"devicetype_name"`
}
type DeviceType struct {
	DeviceTypeID   int    `json:"devicetype_id"`
	DeviceTypeName string `json:"devicetype_name"`
}
