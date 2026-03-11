from django.db import models

# Create your models here.
from django.db import models
from doctors.models import Doctor
from patients.models import Patient



class Appointment(models.Model):

    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)

    date = models.DateField()
    time = models.TimeField()

    status = models.CharField(
        max_length=20,
        default="Pending"
    )

    def __str__(self):
        return f"{self.patient} - {self.doctor}"