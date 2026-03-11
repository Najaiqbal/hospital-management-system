from django.db import models
from django.contrib.auth.models import User


class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    doctor_id = models.CharField(max_length=20, unique=True)
    aadhar = models.CharField(max_length=12, blank=True)
    specialization = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=15, blank=True)
    experience = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username