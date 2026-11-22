package com.tripsync;

import org.flywaydb.core.Flyway;

public class FlywayRepair {

    public static void main(String[] args) {

        Flyway flyway = Flyway.configure()
                .dataSource(
                        "jdbc:mysql://localhost:3306/tripsync_db",
                        "root",
                        "root"
                )
                .baselineOnMigrate(true)
                .load();

        flyway.repair();

        System.out.println("Flyway repair completed!");
    }
}