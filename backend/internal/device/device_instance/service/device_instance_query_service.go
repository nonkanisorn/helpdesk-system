package service

import (
	"github.com/nonkanisorn/helpdesk-system/internal/device/device_instance/repository"
	"github.com/nonkanisorn/helpdesk-system/internal/domain"
)

type deviceInstanceQueryService struct {
	deviceInstanceRepo repository.DeviceInstanceQueryRepository
}

func NewDeviceInstanceQueryService(deviceInstanceRepo repository.DeviceInstanceQueryRepository) DeviceInstanceQueryService {
	return deviceInstanceQueryService{deviceInstanceRepo: deviceInstanceRepo}
}

func (d deviceInstanceQueryService) CheckSerialNumber(serialNumber string) (*domain.DeviceInstanceResponse, error) {
	deviceInstanceID, err := d.deviceInstanceRepo.CheckSerialNumber(serialNumber)
	if err != nil {
		return nil, err
	}
	deviceInstanceIDResponse := domain.DeviceInstanceResponse{
		DeviceInstanceID: deviceInstanceID,
	}

	return &deviceInstanceIDResponse, nil
}
