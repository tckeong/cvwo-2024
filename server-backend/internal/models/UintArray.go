package models

import (
	"database/sql/driver"
	"errors"
	"fmt"
	"strconv"
	"strings"
)

// UintArray IntArray represents an array of integers for PostgreSQL.
type UintArray []uint

// Value converts the UintArray to a format that can be stored in the database.
// It converts the uint array to the string format.
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

// Scan converts the database representation to an IntArray.
// It converts the string format to the uint array.
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
		if v == "" {
			continue
		}

		value, err := strconv.ParseUint(v, 10, 64)

		if err != nil {
			return err
		}

		*uintArray = append(*uintArray, uint(value))
	}

	return nil
}
