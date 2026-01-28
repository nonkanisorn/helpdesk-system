package repository

import "github.com/jmoiron/sqlx"

type deviceInstanceRepository struct {
	db *sqlx.DB
}

func NewDeviceInstanceRepository(db *sqlx.DB) DeviceInstanceRepository {
	return deviceInstanceRepository{db: db}
}

func (d deviceInstanceRepository) GetAll() ([]DeviceInstance, error) {
	var deviceInstances []DeviceInstance
	query := "select instance_id, device_id, serial_number, device_number, dep_id from device_instances"
	err := d.db.Select(&deviceInstances, query)
	if err != nil {
		return nil, err
	}
	return deviceInstances, nil
}
