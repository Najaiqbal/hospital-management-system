from django.db import models
from django.contrib.auth.models import User


class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    patient_id = models.CharField(max_length=20, unique=True)
    age = models.IntegerField(default=0)
    gender = models.CharField(max_length=10, blank=True)
    address = models.TextField(blank=True)
    disease = models.CharField(max_length=200, blank=True)
    phone = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return self.user.username