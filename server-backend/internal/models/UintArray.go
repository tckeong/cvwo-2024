package models

import (
	"database/sql/driver"
	"errors"
	"fmt"
	"strconv"
	"strings"
)

// IntArray represents an array of integers for PostgreSQL
type UintArray []uint

// Value converts the IntArray to a format that can be stored in the database
func (uintArray UintArray) Value() (driver.Value, error) {
	result := ""

	for i := 0; i < len(uintArray); i++ {
		result += fmt.Sprintf("%d", uintArray[i])
		if i != len(uintArray)-1 {
			result += ","
		}
	}

	return result, nil
}

// Scan converts the database representation to an IntArray
func (uintArray *UintArray) Scan(value interface{}) error {
	if value == nil {
		*uintArray = nil
		return nil
	}

	tempString, ok := value.(string)
	if !ok {
		return errors.New("invalid type for value")
	}

	tempString = strings.Trim(tempString, "{}")

	for _, v := range strings.Split(tempString, ",") {
		temp := string(v)

		if temp == "" {
			continue
		}

		value, err := strconv.ParseUint(temp, 10, 64)

		if err != nil {
			return err
		}

		*uintArray = append(*uintArray, uint(value))
	}

	return nil
}
