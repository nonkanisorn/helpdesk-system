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

func (d deviceInstanceRepository) Create(deviceID int, deviceNumber int, depID int, serialNumber string) error {
	query := "insert into device_instances (device_id,serial_number,device_number,dep_id) values(?,?,?,?)"
	_, err := d.db.Exec(query, deviceID, serialNumber, deviceNumber, depID)
	if err != nil {
		return err
	}
	return nil
}

func (d deviceInstanceRepository) DeleteDeviceInstanceByID(deviceInstanceID int) error {
	query := "delete from device_instances where instance_id = ? "
	_, err := d.db.Exec(query, deviceInstanceID)
	if err != nil {
		return err
	}
	return nil
}
