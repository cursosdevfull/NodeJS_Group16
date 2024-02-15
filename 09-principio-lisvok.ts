class Appointment {
  createMedicAppointment(medicId: string, centerId: string, date: Date) {
    console.log("medicId", medicId);
    console.log("centerId", centerId);
    console.log("date", date);
  }
}

class AppointmentImages extends Appointment {
  createImageAppointment(
    historyId: string,
    type: string,
    centerId: string,
    date: Date
  ) {
    console.log("historyId", historyId);
    console.log("type", type);
    console.log("centerId", centerId);
    console.log("date", date);
  }
}

class AppointmentLaboratory extends AppointmentImages {
  createLaboratoryAppointment(
    historyId: string,
    type: string,
    centerId: string,
    date: Date
  ) {
    console.log("historyId", historyId);
    console.log("type", type);
    console.log("centerId", centerId);
    console.log("date", date);
  }
}

const appointment = new AppointmentLaboratory();
appointment.createMedicAppointment("abc", "def", new Date());
