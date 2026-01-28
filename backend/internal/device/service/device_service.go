package service

import "github.com/nonkanisorn/helpdesk-system/internal/device/repository"

type deviceService struct {
	deviceRepo repository.DeviceRepository
}

func NewDeviceService(deviceRepo repository.DeviceRepository) DeviceService {
	return &deviceService{deviceRepo: deviceRepo}
}

func (d deviceService) GetAllDevices() ([]DeviceResponse, error) {
	devices, err := d.deviceRepo.GetAll()
	if err != nil {
		return nil, err
	}
	deviceResponse := []DeviceResponse{}
	for _, device := range devices {
		deviceRes := DeviceResponse{
			DeviceID:   device.DeviceID,
			DeviceName: device.DeviceName,
			DeviceType: device.DeviceType,
		}
		deviceResponse = append(deviceResponse, deviceRes)
	}
	return deviceResponse, nil
}

func (d deviceService) CreateDevices(deviceName string, deviceType int) error {
	err := d.deviceRepo.Create(deviceName, deviceType)
	if err != nil {
		return err
	}
	return nil
}

func (d deviceService) DeleteDevices(deviceID int) error {
	err := d.deviceRepo.Delete(deviceID)
	if err != nil {
		return err
	}
	return nil
}
