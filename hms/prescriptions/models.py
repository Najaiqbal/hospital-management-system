from django.db import models

# Create your models here.
from django.db import models
from doctors.models import Doctor
from patients.models import Patient
from appointments.models import Appointment


class Prescription(models.Model):

    appointment = models.ForeignKey(Appointment,on_delete=models.CASCADE)

    doctor = models.ForeignKey(Doctor,on_delete=models.CASCADE)

    patient = models.ForeignKey(Patient,on_delete=models.CASCADE)

    medicine = models.CharField(max_length=200)

    dosage = models.CharField(max_length=200)

    notes = models.TextField()

    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.patient} - {self.medicine}"