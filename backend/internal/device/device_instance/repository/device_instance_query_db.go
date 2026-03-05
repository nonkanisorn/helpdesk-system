package repository

import "github.com/jmoiron/sqlx"

type deviceInstanceQueryRepositoryDB struct {
	db *sqlx.DB
}

func NewDeviceInstanceQueryRepositoryDB(db *sqlx.DB) DeviceInstanceQueryRepository {
	return deviceInstanceQueryRepositoryDB{db: db}
}

func (d deviceInstanceQueryRepositoryDB) CheckSerialNumber(serialNumber string) (int, error) {
	var instanceID int
	query := "select instance_id from device_instances di where di.serial_number = ?"
	err := d.db.Get(&instanceID, query, serialNumber)
	if err != nil {
		return 0, err
	}
	return instanceID, nil
}
