import time
import schedule
from django.core.management.base import BaseCommand
from real_time_prediction.views import predictRealTime

class Command(BaseCommand):
    help = 'Run real-time prediction every 30 minutes'

    def handle(self, *args, **options):
        schedule.every(30).minutes.do(predictRealTime)

        while True:
            schedule.run_pending()
            time.sleep(1)