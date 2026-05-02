package handler

import (
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/nonkanisorn/helpdesk-system/internal/device/device_type/service"
	"github.com/nonkanisorn/helpdesk-system/internal/domain"
)

type deviceTypeHandler struct {
	deviceTypeServ service.DeviceTypeService
}

func NewDeviceTypeHandler(deviceTypeServ service.DeviceTypeService) deviceTypeHandler {
	return deviceTypeHandler{deviceTypeServ: deviceTypeServ}
}

func (d deviceTypeHandler) GetAllDeviceTypes(c *fiber.Ctx) error {
	deviceTypes, err := d.deviceTypeServ.GetAllDeviceType()
	if err != nil {
		fmt.Println(err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data": deviceTypes,
	})
}

func (d deviceTypeHandler) Create(c *fiber.Ctx) error {
	var deviceTypes domain.DeviceTypeRequest
	err := c.BodyParser(&deviceTypes)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"error":   err,
		})
	}
	err = d.deviceTypeServ.Create(deviceTypes.DeviceTypeName)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"error":   err,
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
	})
}

func (d deviceTypeHandler) DeleteDeviceTypesByID(c *fiber.Ctx) error {
	deviceTypeID, err := strconv.Atoi(c.Params("deviceTypeID"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"error":   err.Error(),
		})
	}
	err = d.deviceTypeServ.DeleteDeviceTypesByID(deviceTypeID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"error":   err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
	})
}

func (d deviceTypeHandler) EditDeviceTypeByID(c *fiber.Ctx) error {
	deviceTypeID, err := strconv.Atoi(c.Params("deviceTypeID"))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"error":   err.Error(),
		})
	}
	var deviceTypeReq domain.DeviceTypeRequest
	err = c.BodyParser(&deviceTypeReq)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"error":   err.Error(),
		})
	}
	deviceType := domain.DeviceType{
		DeviceTypeID:   deviceTypeID,
		DeviceTypeName: deviceTypeReq.DeviceTypeName,
	}
	err = d.deviceTypeServ.EditDeviceTypeByID(deviceType)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"error":   err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
	})
}
