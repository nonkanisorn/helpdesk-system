package repository

import (
	"github.com/jmoiron/sqlx"
	"github.com/nonkanisorn/helpdesk-system/internal/domain"
)

type deviceTypeRepositoryDB struct {
	db *sqlx.DB
}

func NewDeviceTypeRepository(db *sqlx.DB) DeviceTypeRepository {
	return &deviceTypeRepositoryDB{db: db}
}

func (d deviceTypeRepositoryDB) GetAll() ([]DeviceType, error) {
	var deviceType []DeviceType
	query := "select devicetype_id, devicetype_name from device_types"
	err := d.db.Select(&deviceType, query)
	if err != nil {
		return nil, err
	}

	return deviceType, nil
}

func (d deviceTypeRepositoryDB) Create(deviceTypeName string) error {
	query := "INSERT INTO device_types (devicetype_name) VALUES(?)"
	_, err := d.db.Exec(query, deviceTypeName)
	if err != nil {
		return err
	}
	return nil
}

func (d deviceTypeRepositoryDB) DeleteDeviceTypeByID(deviceTypeID int) error {
	query := "delete from device_types where devicetype_id = ?"
	_, err := d.db.Exec(query, deviceTypeID)
	if err != nil {
		return err
	}
	return nil
}

func (d deviceTypeRepositoryDB) EditDeviceTypeByID(deviceType domain.DeviceType) error {
	query := "update device_types set devicetype_name = ? where devicetype_id = ? "
	_, err := d.db.Exec(query, deviceType.DeviceTypeName, deviceType.DeviceTypeID)
	if err != nil {
		return err
	}

	return nil
}
