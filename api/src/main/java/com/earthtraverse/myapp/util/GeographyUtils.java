package com.earthtraverse.myapp.util;

import lombok.experimental.UtilityClass;

@UtilityClass
public class GeographyUtils {
    private static final int EARTH_RADIUS_IN_KM = 6371;

    /**
     * This method calculates the great-circle distance between two points on the earth's surface,
     * specified in decimal degrees of latitude and longitude.
     * Ref: https://en.wikipedia.org/wiki/Haversine_formula
     *
     * @param startLatitude  The starting latitude in decimal degrees
     * @param startLongitude The starting longitude in decimal degrees
     * @param endLatitude    The ending latitude in decimal degrees
     * @param endLongitude   The ending longitude in decimal degrees
     * @return The calculated distance in kilometers.
     */
    public double calculateDistance(double startLatitude, double startLongitude, double endLatitude, double endLongitude) {
        double deltaLatitude = Math.toRadians((endLatitude - startLatitude));
        double deltaLongitude = Math.toRadians((endLongitude - startLongitude));

        double startLatitudeInRadians = Math.toRadians(startLatitude);
        double endLatitudeInRadians = Math.toRadians(endLatitude);

        double a = haversine(deltaLatitude) + Math.cos(startLatitudeInRadians) * Math.cos(endLatitudeInRadians) * haversine(deltaLongitude);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS_IN_KM * c;
    }

    /**
     * Helper method for the Haversine formula.
     * Computes the haversine of a value (i.e., {sin(value / 2)}^2).
     *
     * @param value The value to compute the haversine of.
     * @return The haversine of the value.
     */
    public double haversine(double value) {
        return Math.pow(Math.sin(value / 2), 2);
    }
}
