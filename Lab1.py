# Course: IT1114/
# Student Name: 
# Assignment Number: Lab 1
# Date: 

# Purpose:
# This program calculates the total square footage of a room,
# the cost of flooring based on a price per square foot,
# the tax amount, and the final total cost including tax.

# Ask the user for the length of the room
room_length = float(input("Room Length: "))

# Ask the user for the width of the room
room_width = float(input("Room Width: "))

# Ask the user for the cost per square foot
cost_per_sqft = float(input("Cost per Sq. Foot: "))

# Calculate total square feet
square_feet = room_length * room_width

# Calculating flooring cost
flooring_cost = square_feet * cost_per_sqft

# Calculating tax (7%)
tax_amount = flooring_cost * 0.07

# Calculate total amount due
total_cost = flooring_cost + tax_amount

# results
print("Square feet:", square_feet)
print("Flooring:", flooring_cost)
print("Tax:", tax_amount)
print("Total:", total_cost)
