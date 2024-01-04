package models

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"fmt"
)

// IntArray represents an array of integers for PostgreSQL
type IntegerArray []int

// Value converts the IntArray to a format that can be stored in the database
func (a IntegerArray) Value() (driver.Value, error) {
	return json.Marshal(a)
}

// Scan converts the database representation to an IntArray
func (a *IntegerArray) Scan(value interface{}) error {
	if value == nil {
		*a = nil
		return nil
	}
	b, ok := value.([]byte)
	if !ok {
		return errors.New("Invalid type for IntArray")
	}
	var result []int
	err := json.Unmarshal(b, &result)
	if err != nil {
		return fmt.Errorf("Error unmarshalling IntArray: %s", err)
	}
	*a = result
	return nil
}
